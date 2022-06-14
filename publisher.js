const amqp = require("amqplib")
const { Connection } = require("amqplib/lib/connection")

const message = {
    description : "Bu bir test mesajıdır.."
}

connect_rabbitmq();

async function connect_rabbitmq(){
    try{
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel  = await connection.createChannel();
    const assertion = await channel.assertQueue("jobsQueue")

    setInterval(() => {
        message.description = new Date().getTime()
        channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)))
        console.log("Gönderilen Mesaj", message);
    }, 10);


// // //     channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)))
// // // console.log("Gönderilen Mesaj", message);

        }catch(error){

    console.log("Error", error);
}

}