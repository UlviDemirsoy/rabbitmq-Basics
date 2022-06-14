const amqp = require("amqplib")
const { Connection } = require("amqplib/lib/connection")


connect_rabbitmq();

async function connect_rabbitmq(){
    try{
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel  = await connection.createChannel();
    const assertion = await channel.assertQueue("jobsQueue")

    //Mesajın Alınması..
        console.log("Mesaj bekleniyor...")
    channel.consume("jobsQueue", (message)=>{
        console.log("Message", message.content.toString());
        channel.ack(message)
    });
    
    
    }catch(error){

    console.log("Error", error);
}

}