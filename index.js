'use strict'

const request = require('request')
const nmap = require('node-nmap')
const Spinner = require('cli-spinner').Spinner;

function getHosts(callback) {
    let scanspinner = new Spinner('Scanning network...')
    scanspinner.start()
    const nmapscan = new nmap.NmapScan('192.168.8.0/24', '-sS -O -p80,8080')
    nmapscan.on('complete', hosts => {

        console.log("Found:")
        const filteredData = hosts
            .filter(host => host.openPorts.length > 0)
            .map(({ip, openPorts}) => {
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
        console.log('error', error)
        scanspinner.stop()
    })

    nmapscan.startScan()
}


getHosts(hosts => {
    console.log('\n')
    hosts.forEach(host => {
        let url = `http://${host.ip}:${host.port}`
        request(url, function (error, response, body) {
            console.log(`Results for ${url}, Status Code: ${response.statusCode}`)
        });
    })
})
