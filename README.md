# open-80

![NPM Badge](https://nodei.co/npm/open-80.png?compact=true)

![Node.js CI](https://github.com/divanvisagie/open-80/workflows/Node.js%20CI/badge.svg)

Tool to find open web admin tools on a local network

## Description
Scans a network for open http ports and then does a get on them to see if they return a 401 or a 200, roughly speaking if they dont have basic auth they might be open so it narrows down the search for open admin interfaces on the network that you may want to lock down after finding.


## Requirements

This tool is written in nodejs and thus requires that to run, it also uses
nmap to get the job done and so you will need to have that installed too

## Installation

sudo npm install -g open-80

## Usage

The application uses a command from nmap that requires root access, so:
```sh
sudo open-80 -i 192.168.1.0
```

You can also print help which will give you this:

```bash
Open 80

  App to scan open web interfaces on your network.

  It scans the network using nmap based on the ip provided and then checks if
  those IPs have open web interfaces on them

Options

  -i, --ip string   The IP used to start with scanning the network
  -h, --help        Print this usage guide.
```

## OS Compatibility

I wrote this on a Linux muchine, it will probably work on macOS and I will 
attempt running it there at some point, no guarantees for Windows though.

## License
GNU GENERAL PUBLIC LICENSE Version 3

See [LICENSE](./LICENSE) for details.
