"use strict";

async function main() {
    const url=`${config.servicesPath}/task/2`

    try {
        const response = await fetch(url,{
            method: "PUT",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({'status': 'DONE'})
        })
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