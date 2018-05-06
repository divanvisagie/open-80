# open-80
Tool to find open web admin tools on a local network

## Description
Scans a network for open http ports and then does a get on them to see if they return a 401 or a 200, roughly speaking if they dont have basic auth they might be open so it narrows down the search for open admin interfaces on the network that you may want to lock down after finding.


## Requirements

This tool is written in nodejs and thus requires that to run, it also uses
nmap to get the job done and so you will need to have that installed too

## OS Compatibility

I wrote this on a Linux muchine, it will probably work on macOS and I will 
attempt running it there at some point, no guarantees for Windows though.

## License
GNU GENERAL PUBLIC LICENSE Version 3

See [LICENSE](./LICENSE) for details.
