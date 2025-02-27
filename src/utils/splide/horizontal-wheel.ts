import { EventInterface } from "@splidejs/splide";
import { Splide, Components, Options } from "@splidejs/splide";
import { BaseComponent } from "@splidejs/splide";

interface WheelComponent extends BaseComponent {}

/**
 * Extracts the timestamp from the event object.
 *
 * @param e - An Event object.
 */
function timeOf(e: Event): number {
  return e.timeStamp;
}

/**
 * Call the `preventDefault()` of the provided event.
 *
 * @param e               - An Event object.
 * @param stopPropagation - Optional. Whether to stop the event propagation or not.
 */
function prevent(e: Event, stopPropagation?: boolean): void {
  e.preventDefault();

  if (stopPropagation) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}

/**
 * Component for observing the horizontal mouse wheel and moving the slider.
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Wheel component object.
 */
function HorizontalWheel(
  Splide: Splide,
  Components: Components,
  options: Options
): WheelComponent {
  const { bind } = EventInterface(Splide);

  /**
   * Holds the last time when the wheel moves the slider.
   */
  let lastTime = 0;
  let lastDeltaX = 0;

  /**
   * Called when the component is mounted.
   */
  function mount(): void {
    bind(Components.Elements.root, "wheel", onWheel, {
      passive: false,
      capture: true,
    });
  }

  /**
   * Called when the user rotates the mouse wheel on the slider.
   *
   * @param e - A WheelEvent object.
   */
  function onWheel(e: WheelEvent): void {
    if (Math.abs(e.deltaY) < 5) {
      //
      if (e.cancelable) {
        const { deltaX } = e;
        const backwards = deltaX < 0;
        const timeStamp = timeOf(e);
        const min = options.wheelMinThreshold || 0;
        const sleep = options.wheelSleep || 0;

        if (
          Math.abs(deltaX) > min &&
          timeStamp - lastTime > sleep &&
          Math.abs(deltaX) > Math.abs(lastDeltaX)
        ) {
          Splide.go(backwards ? "<" : ">");
          lastTime = timeStamp;
        }

        lastDeltaX = deltaX;

        shouldPrevent(backwards) && prevent(e);
      }
    }
  }

  /**
   * Checks whether the component should prevent the default action of the wheel event or not.
   *
   * @param backwards - Set this to `true` for backwards direction.
   *
   * @return `true` if the action should be prevented.
   */
  function shouldPrevent(backwards: boolean): boolean {
    return (
      !options.releaseWheel ||
      // || Splide.state.is(MOVING)
      Splide.state.is(4) || // MOVING = 4
      Components.Controller.getAdjacent(backwards) !== -1
    );
  }

  return {
    mount,
  };
}

export default HorizontalWheel;
