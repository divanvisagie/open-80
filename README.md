# open-80
Tool to find open web admin tools on a local network

## Description
Scans a network for open http ports and then does a get on them to see if they return a 401 or a 200, roughly speaking if they dont have basic auth they might be open so it narrows down the search for open admin interfaces on the network that you may want to lock down after finding.


