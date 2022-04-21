# 📺 Boards
Boards is a CLI written in node.js that shows accurate & live railway station deaprture boards in the terminal, using data sourced from the [National Rail Enquiries API](https://www.nationalrail.co.uk/46391.aspx).

## Using Boards
Generating a live departure board is easy, and can be done in the terminal using just one command!
> Boards clears the terminal before running to provide a cleaner viewing experience
```shell
boards [CRS] [NUM]
```
Please note the following parameters:
| Name | Description | Required | Default |
| - | - | - | - |
| CRS | The Computer Reservation System code for the station, you can find a list of all of these [here](https://www.nationalrail.co.uk/stations_destinations/48541.aspx) | Yes | - |
| NUM | The number of services to display on the board | No | 10 |

## Example
Running Boards to generate a live departure board for [Birmingham New Street Station](https://www.networkrail.co.uk/communities/passengers/our-stations/birmingham-new-street/)
```shell
boards BHM
```
Returns the following departure board, last updated (21/04/2022)

![image](https://user-images.githubusercontent.com/38474124/164531063-b15af16c-652d-4652-8c35-93eb23888d58.png)
## License

![http://www.gnu.org/licenses/gpl-3.0.en.html](https://www.gnu.org/graphics/gplv3-127x51.png)

Boards is Free Software: You can use, study share and improve it at your will. Specifically you can redistribute and/or modify it under the terms of the [GNU General Public License](https://www.gnu.org/licenses/gpl.html) as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

> Boards gets all of its realtime data from National Rail's [Live Departure Boards Web Service](http://lite.realtime.nationalrail.co.uk/openldbws/)
<img src="images/NRE_Powered_logo.png" width="300" height="auto">
