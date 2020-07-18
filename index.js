#! /usr/bin/env node
'use strict'

const request = require('request')
const nmap = require('node-nmap')
const Spinner = require('cli-spinner').Spinner;
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

function getHosts(ipString, callback) {
    let scanspinner = new Spinner('Scanning network...')
    scanspinner.start()
    const nmapscan = new nmap.NmapScan(`${ipString}/24`, '-sS -O -p80,8080')
    nmapscan.on('complete', hosts => {

        console.log("Found:")
        const filteredData = hosts
            .filter(host => host.openPorts.length > 0)
            .map(({
                ip,
                openPorts
            }) => {
                const mapped = {
                    ip: ip,
                    port: openPorts.map(port => port.port)[0]
                }
                console.log(`${mapped.ip}, ${mapped.port}`)
                return mapped
            })

        scanspinner.stop()

        callback(filteredData);
    })
    nmapscan.on('error', error => {
        console.log('\nError:', error)
        scanspinner.stop()
        process.exit()
    })

    nmapscan.startScan()
}

const optionDefinitions = [{
        name: 'ip',
        description: `The IP used to start with scanning the network`,
        alias: 'i',
        type: String
    },
    {
        name: 'help',
        alias: 'h',
        description: 'Print this usage guide.',
        type: Boolean
    }
]

function printHelp() {
    const sections = [{
            header: 'Open 80',
            content: `App to scan open web interfaces on your network.
            
            It scans the network using nmap based on the ip provided and then checks if those IPs have open web interfaces on them`
        },
        {
            header: 'Options',
            optionList: optionDefinitions
        }
    ]

    const usage = commandLineUsage(sections)
    console.log(usage)

}

const options = commandLineArgs(optionDefinitions)

if (options.help) {
    printHelp()
    process.exit()
}

if (!options.ip) {
    console.log('Please provide start ip with -i xxx.xxx.xxx.xxx or --ip=xxx.xxx.xxx.xxx')
    process.exit()
}

getHosts(options.ip, hosts => {
    console.log('\n')
    hosts.forEach(host => {
        let url = `http://${host.ip}:${host.port}`
        request(url, function (error, response, body) {
            if (!response) {
                console.log(`No response from ${url}`)
                return
            }

            console.log(`Results for ${url}, Status Code: ${response.statusCode}`)
        });
    })
})