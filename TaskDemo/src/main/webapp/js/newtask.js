async function main() {
    const url=`${config.servicesPath}/task`

    try {
        const response = await fetch(url,{
            method: "POST",
            headers: {"Content-Type": "application/json; charset=utf-8"},
            body: JSON.stringify({"title":"Something more to do", "status": "WAITING"})
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