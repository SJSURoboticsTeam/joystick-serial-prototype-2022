# This is the setup for MotionEyeOS on raspberry pi w zero

## Initial requirements
* raspberry pi zero w
* image flashing software like balena etcher
* micro sd card 8-32gb
* (peripherals like keyboard, mouse, and a monitor might be necessary for debugging)

## Flashing MotionEyeOS
* Get the image source from [here](https://github.com/motioneye-project/motioneyeos/releases "here")
* choose the raspberry pi image option
* **Make sure to unzip it, the source file will work for all step, but there will be no camera display**
* Use balena etcher to flash the image onto the sd card
* put the wpa_supplicant file in the folder into the sd card, it is necessary for wifi
* configure the wpa supplicant file as necessary

## Setting up the pi
* put the sd card into the raspberry pi and other peripherals like the mouse, keyboard, and monitor connection
* the login name is 'admin' and there is no password, just press enter
* check the status of the camera with the command 'vcgencmd get_camera'
* it should say the 'detected = 1 supported = 1'

## Getting Video Output
* put the ip of the rpi into a web browser
* put in the logins same as above
* check to see if there is a video output

## Configuring the Video Quality
* disable all the servers in the services tab
* **MAKE SURE TO TURN ON FAST NETWORK IN EXPERT SETTING**
* apply changes
* configure the quality in the video streaming and video device

## Configuring Static IP
* In network settings, select manual IP.
* Enter an appropriate static IP and DNS
* Apply changes.
* Note: The chassis camera should have an IP ending in .201, the leg cameras should span .202, .203, and .204, the arm camera should be .205, and the mast camera should be .206
