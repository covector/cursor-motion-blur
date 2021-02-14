# Cursor Motion Blur
This is a Chrome extension that adds motion blur to your cursor.<br>
![Icon](icons/moblur-icon_128.png)

# Install
TODO

# Options

## Cursor image
The image of the blurred cursor. Default to Windows default white cursor.

**Example:**<br />
Cursor image is set to png of a white dot

## Cursor width
The width of the cursor, only accepts css unit. Default to 12.5vh, vh is used because it is independent of browser zoom, but you can also use other units like px.

**Example:**<br />
Cursor width is set to 30px

## Opacity
Opacity of the image trailing behind the cursor, must be between 0 to 1. Default to 0.04.

**Example:**<br />
Opaicty is set to 0.5

## Samples
Number of the image trailing behind the cursor, must be integer. Default to 32, be careful not to set too high as it may lag.

**Example:**<br />
Samples is set to 128

## Delay
The spacing between each images trailing behind the cursor. Default to 0.001.

**Example:**<br />
Delay is set to 0.01

## Duration
Control how fast the image will move to the cursor, the higher this value, the slower it is. Default to 0.05, when set too high, the last few image will start to act strange (see example).

**Example:**<br />
Duration is set to 0.1

## Hide real cursor
Whether to hide the real cursor and pretend the first image is the actual cursor. When this is checked, the motion blur effect will look better but there will be some mouse input delay. When this is unchecked, the images will lag behind a bit (see example), but there will not be input delay. Default to true.

**Example:**<br />
Hide real cursor set to false

## Force hide real cursor
Whether to also hide the real cursor when the cursor type is set to other thing, e.g. hovering a button. This option only takes effect if Hide real cursor is checked. If this is unchecked, there may be inconsistency between cursor and the trailing images. Default to true.

**Example:**<br />
Force hide real cursor set to false while Hide real cursor set to true

# Error Messages
