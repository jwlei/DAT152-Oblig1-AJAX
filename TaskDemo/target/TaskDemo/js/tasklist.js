"use strict";

async function main() {
    const url=`${config.servicesPath}/tasklist`

    try {
        const response = await fetch(url,{method: "GET"})
        try {
            const text = await response.text()
            console.log(text)
        } catch (error) {
            console.log(error)
        }            
    } catch (error) {
        console.log(error)
    }
}

main()
