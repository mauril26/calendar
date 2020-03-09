/**
 * Defines a color as a combination of main colors channels: red, green, blue.
 */

export type Color = {
  /**
   * Defines the color red channel.  The range is [0 - 255].
   */
  'R': number,

  /**
   * Defines the color green channel.  The range is [0 - 255].
   */
  'G': number,

  /**
   * Defines the color blue channel. The range is [0 - 255].
   */
  'B': number
}
