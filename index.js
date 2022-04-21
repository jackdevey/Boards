const { NationalRailWrapper } = require("ts-national-rail-wrapper")
const chalk = require('chalk');

// Use dotenv
require('dotenv').config()

// Log in to NR api
const nationalRail = new NationalRailWrapper(process.env.TOKEN)

// Get the station code args
const crs = process.argv[2].toUpperCase();

// Get the number of services
if (process.argv.length == 4) {
    num = process.argv[3]
} else num = 10

// Clear the terminal before printing
print("\033c");
// Add loading message
print(chalk.gray("Loading departure board for " + crs + "..."));

// Update the data every 30 seconds
async function update() {
    // Move the cursor to remove the new line
    setTimeout(async function () {
        // Get the departures from NR
        var resp = await nationalRail.getDepartures({ fromStation: crs, count: num });
        // Move the cursor to write over the previous table
        print("\033[5;0H");
        // Print the data
        printBody(resp);
        // Live updates
        update();
    }, 30000);
}

// Get the initial data & then begin updates
const get = async () => {
    // Get the departures from NR
    try {
        var resp = await nationalRail.getDepartures({ fromStation: crs, count: num });
    } catch(err) {
        // If an error occured
        print(chalk.red("\nError: " + err.message));
        return
    }
    // Clear the terminal to remove loading message
    print("\033c");
    // Print the title block
    title("BHM");
    // Print the table headings
    print(chalk.bold(formatString("Time", 5)));
    print(chalk.bold(formatString("Destination", 25)));
    print(chalk.bold(formatString("Plat", 4)));
    print(chalk.bold(formatString("Expected", 9)));
    print(chalk.bold(formatString("Operator", 30)) + "\n");
    // Print the data
    printBody(resp);
    // Live updates
    update();
}

get()

// Print the main body of data from the response
function printBody(resp) {
    for (i in resp.data) {
        // Get each departure
        var departure = resp.data[i];
        // If there isn't a platform, set it to "-"
        if (departure.platform != null) {
            var platform = departure.platform
        } else platform = "-"
        // Calculate formatting for the expected time
        var expected
        if (departure.etd == "On time") expected = chalk.green(formatString(departure.etd, 9))
        else if (departure.etd == "Cancelled") expected = chalk.red(formatString(departure.etd, 9))
        else expected = chalk.yellow(formatString(departure.etd, 9))
        // Print the row out
        print(chalk.gray(formatString(departure.std, 5)))
        print(chalk.white(formatString(departure.destination.location[0].locationName, 25)))
        print(chalk.grey(formatString(platform, 4)))
        print(expected)
        print(chalk.grey(formatString(departure.operator, 30)))
        print("\n") // New line for next row
    }
}

// Prin the title block
function title() {
    print(chalk.red("LIVE") + chalk.white(" Departures from " + crs + "\n")) // Station code
    print(chalk.gray("Powered by National Rail Enquiries\n")) // NR Attribution
    console.log() // New line for spacing
}

// Wrapper function for printing without new line
function print(string) { process.stdout.write(string); }

// Format a string by adding spaces to the end
function formatString(string, maxLength) {
    var spaces = maxLength - string.length;
    var result = string;
    for (i = 0; i < spaces + 2; i++) {
        result += " "
    }
    return result
}

