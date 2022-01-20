"use strict";

async function main() {
    const url=`${config.servicesPath}/task/2`

    try {
        const response = await fetch(url,{method: "DELETE"})
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