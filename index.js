const Discord = require('discord.js');
const mongoose = require('mongoose');
const levels = require('discord-xp');

levels.setURL('mongodb+srv://dbFalcon:MongontheLoose@christmasbot.3chsi.mongodb.net/Data');

const bot = new Discord.Client();
const prefix = "c!";
mongoose.connect('mongodb+srv://dbFalcon:MongontheLoose@christmasbot.3chsi.mongodb.net/Data', { useNewUrlParser: true, useUnifiedTopology: true })
bot.once('ready', () => {
    console.log('Bot is online'); 
});



bot.login(process.env.token);

bot.on('message', async message =>{
    let args = message.content.substring(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if(!message.guild) return;
    if(message.author.bot) return;
    const randomXp = Math.floor(Math.random()*9)+1;
    const levelUp = await levels.appendXp(message.author.id, message.guild.id, randomXp);
    if(levelUp){
        const user = await levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You leveled up to ${user.level}!`);
    }

    if(command === 'rank'){
        const user = await levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`You are currently level **${user.level}**`);
    }

    if(command === 'lb'){
        const leaderboard = await levels.fetchLeaderboard(message.guild.id, 3);
        if(leaderboard.length < 1) return reply('Nobody on leaderboard yet..');

        const finalLeaderboard = await levels.computeLeaderboard(bot, leaderboard);
        const lb = new Discord.MessageEmbed()
        .setColor('green')
        .setTitle('Leaderboard | ' + Discord.Guild.name)
        .setDescription(finalLeaderboard.map(e=> `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`))
        console.log(finalLeaderboard.map(e=> `${e.position.toLocaleString()}`))
        //message.channel.send(`${lb.join('\n\n')}`);
        message.channel.send(lb);
    }if (command === 'start') {
        atDoor = async () => {
            const carols = {
                'Reindeer': 'https://images.vexels.com/media/users/3/133913/isolated/preview/1581209f30d8c485391f85f82fe814af-reindeer-cartoon-standing-35-by-vexels.png',
                'Snowman': 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clipartbest.com%2Fcliparts%2Fyio%2FL6G%2FyioL6GeeT.png&f=1&nofb=1',
                'Santa': 'https://images.vexels.com/media/users/3/133989/isolated/preview/688e2809830e8c341720c0de721c3cee-santa-claus-head-flat-icon-9-by-vexels.png',
                'Grinch': 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-WvSa6ojp48Y%2FVD8S3mOxYBI%2FAAAAAAAAA3k%2FiYPXwB6GB7A%2Fs1600%2FGrinch.png&f=1&nofb=1',
                'Elf': 'https://www.vexels.com/media/users/3/223077/isolated/thumb/ca07a46295f2f31a7ee4e23d7095b00c-christmas-elf-illustration-by-vexels.png',
                'Polar Bear': 'https://images.vexels.com/media/users/3/208427/isolated/preview/be254728970e6669409112b09ce5eb72-polar-bear-flat-by-vexels.png',
                'Angel': 'https://www.vexels.com/media/users/3/193640/isolated/thumb/8853ddfeaa8b9a0e5d1c9b78cea11a55-angel-wing-nimbus-flat-by-vexels.png',
                'Charlie Brown': 'https://www.jing.fm/clipimg/full/22-221892_mailbox-clipart-usps-charlie-brown-christmas-mailbox.png',
                'Snoopy': 'https://i.pinimg.com/originals/e6/75/bc/e675bc85302839628df306f3dac37317.png',
                'Nutcracker': 'https://i.pinimg.com/originals/fc/35/99/fc359975236974aa61641288d301beb9.png',
                'Gingerbread Man': 'https://banner2.cleanpng.com/20180403/uqw/kisspng-gingerbread-house-gingerbread-man-cartoon-deepika-5ac35522a69c35.8377732415227507546824.jpg',
                'Snowflake': 'https://images.vexels.com/media/users/3/134077/isolated/preview/8b044d06f90477cfbf39ca4a5c6c541c-snowflake-flat-icon-5-by-vexels.png',
                'Penguin': 'https://images.vexels.com/media/users/3/160421/isolated/preview/750c3008b8e4eff075a4a124e0e55be2-penguin-fat-beak-wing-flat-by-vexels.png',
                'Raccoon': 'https://www.vexels.com/media/users/3/218143/isolated/thumb/764c0a48f08a10620dfabb1af6952b52-racoon-animal-christmas-elements-illustration-by-vexels.png'
            }
    
            const carol = Array('Reindeer', 'Snowman', 'Santa', 'Grinch', 'Elf', 'Polar Bear', 'Angel', 'Charlie Brown', 'Snoopy', 'Nutcracker', 'Gingerbread Man', 'Snowflake', 'Penguin', 'Raccoon');
            var randCarol = carol[Math.floor(Math.random() * carol.length)];
    
            const PbEmbed = new Discord.MessageEmbed()
                .setColor('red')
                .setTitle("A carroler has shown up at the door!")
                .setDescription("Respond with !gifts to receive a gift.")
                .setImage(carols[randCarol])
            message.channel.send(PbEmbed).then(m => m.delete({
                timeout: 3000
            }))
        }


        atDoor();
        setInterval(atDoor, Math.floor(Math.random()*7200000)+3600000);
        setTimeout(() => { const ByeEmbed = new Discord.MessageEmbed().setTitle('Looks like the carroler disappeared.. Nobody was there to answer them')
        message.channel.send(ByeEmbed)}, 3000);
        //message.channel.send('They hopped out');
    } else if (command === 'gifts') {
        //var gifts = Array("Snow Globe", "Santa's Hat", "Eggnog", "Cup of Hot Chocolate", 'Ornament', 'Candy Cane', 'Stocking', 'Christmas Tree', 'Candle', 'Set of Mittens', 'Festive Wreath', 'Advent Calendar', 'Gift Box', 'Puppy', 'Mistletoe', 'Christmas Star', 'Fireplace', 'Gingerbread');
        //var randGifts = gifts[Math.floor(Math.random() * gifts.length)];
        jolly = async () => {
            const giftings = {
                'Snow Globe': 'https://www.vexels.com/media/users/3/188369/isolated/thumb/d699e5f9985cfee9dd44ebfd6ecc0dda-christmas-north-pole-snowglobe-icon-by-vexels.png',
                "Santa's Hat": 'https://www.vexels.com/media/users/3/188377/isolated/thumb/1f84e73c7f0de8797dd20c2b6255e79c-christmas-santa-hat-icon-by-vexels.png',
                'Eggnog': 'https://im6.ezgif.com/tmp/ezgif-6-13f71ff9ca3e.png',
                'Cup of Hot Chocolate': 'https://images.vexels.com/media/users/3/134833/isolated/preview/60769754533a68609dbffd5e7776dafc-tea-cup-coffee-teacup-by-vexels.png',
                'Ornament': 'https://images.vexels.com/media/users/3/133080/isolated/preview/a7f007ee7cdb01d1b840ff59c5f77e7e-christmas-ball-flat-icon-101-by-vexels.png',
                'Candy Cane': 'https://www.vexels.com/media/users/3/188359/isolated/thumb/c1508be582720894798baf1d393dff23-christmas-candy-cane-icon-christmas-by-vexels.png',
                'Stocking': 'https://www.vexels.com/media/users/3/188381/isolated/thumb/57aa0eed3948cdc421cd192fbdaa1f7c-christmas-sock-icon-christmas-by-vexels.png',
                'Christmas Tree': 'https://www.vexels.com/media/users/3/223071/isolated/thumb/a40b0b184c732f6ebb9fac3d6baa450b-christmas-tree-and-gifts-illustration-by-vexels.png',
                'Candle': 'https://www.vexels.com/media/users/3/188357/isolated/thumb/55a53924916117b9ee706466becb2d8c-christmas-candle-icon-christmas-by-vexels.png',
                'set of Mittens': 'https://www.vexels.com/media/users/3/188375/isolated/thumb/bbe691bda51c264759e91b5e19ff1520-christmas-santa-gloves-icon-by-vexels.png',
                'Festive Wreath': 'https://www.vexels.com/media/users/3/223074/isolated/thumb/82737ff25549c02ac1dfba39df87982d-christmas-wreath-bow-design-illustration-by-vexels.png',
                'Advent Calendar': 'https://www.vexels.com/media/users/3/193628/isolated/thumb/55b633d12604cee2fcc7c8b8ca68c889-25-calendar-flat-by-vexels.png',
                'Gift Box': 'https://www.vexels.com/media/users/3/188363/isolated/thumb/4e9d7bd85d97635e27876353d48c87e3-christmas-gift-box-icon-by-vexels.png',
                'Puppy': 'https://images.vexels.com/media/users/3/162079/isolated/lists/d498ca9c00e19051b3f50d448757c1af-dog-puppy-tongue-tail-ear-flat.png',
                'Mistletoe': 'https://www.vexels.com/media/users/3/188366/isolated/thumb/44c5641497a9e7d4baaf346276340b1e-christmas-mistletoe-icon-christmas-by-vexels.png',
                'Christmas Star': 'https://www.vexels.com/media/users/3/188383/isolated/thumb/441ae65c263ed326999f19e452b4f044-christmas-star-tree-topper-icon-by-vexels.png',
                'Fireplace': 'https://www.vexels.com/media/users/3/127639/isolated/thumb/aa62d5cadf1264e696fabacf277d8be4-fireplace-flat-icon-by-vexels.png',
                'Gingerbread': 'https://www.vexels.com/media/users/3/127528/isolated/thumb/447d7d5afafa4acf6969c13c5ffac622-dancing-gingerbread-man-cookie-by-vexels.png',
                'Gingerbread House': 'https://images.vexels.com/media/users/3/193861/isolated/preview/65aa7f2788134cb6bd255dbd1e0be750-cookie-gingerbread-house-isometric-by-vexels.png',
                'Cookie': 'https://images.vexels.com/media/users/3/151625/isolated/preview/0484184d72076b38f8b68869d565ab1b-chocolate-chip-cookie-icon-by-vexels.png',
                'set of Ice Skates': 'https://images.vexels.com/media/users/3/133700/isolated/preview/ac80005e09cbf696661d2ee3583bb67c-ice-skate-flat-icon-8-by-vexels.png',
                'Snowboard': 'https://images.vexels.com/media/users/3/157001/isolated/preview/11d2f49029d6f361724727cfc1039726-snowboard-top-view-icon-by-vexels.png',
                'set of Skis': 'https://images.vexels.com/media/users/3/156987/isolated/preview/6d5a4645d2188eb98dcdd1704758fbf4-skis-top-view-icon-by-vexels.png',
                'Snowball': 'https://lh3.googleusercontent.com/proxy/xFMQAu5dE7H_8LXyqFPbRT1W_6UMvyUXfyjlVS-XXvJrtWi-2Krj8EtFYxt33vGDPjT4lUXkVe23FYh7_oxuwDaZORKanzj38SykD2PxjUVu3ch00N6ebvE',
                'Icicle': 'https://images.vexels.com/media/users/3/153904/isolated/preview/dea9aa29e7a727d3fe0325cbc6582075-snow-icicle-icon-by-vexels.png',
                'Bicycle': 'https://images.vexels.com/media/users/3/156929/isolated/preview/db12d72d29906c6493e08b00b13a3553-racing-bicycle-icon-by-vexels.png',
                'Toy Robot': 'https://images.vexels.com/media/users/3/201138/isolated/preview/143b8e1550deda3eadf5a8c0045cbb0f-robot-toy-flat-by-vexels.png',
                'Christmas Light': 'https://images.vexels.com/media/users/3/217886/isolated/preview/01f79b8fa15ad08744906127aeba720a-christmas-lights-decoration-illustration-by-vexels.png',
                'Sled': 'https://images.vexels.com/media/users/3/210986/isolated/preview/e6d028271ff5bc1f4503704ee30f875f-eskimo-doodle-sled-illustration-by-vexels.png',
                'Pair of Snow Goggles': 'https://images.vexels.com/media/users/3/201708/isolated/preview/921c78767d58a6466780d2de0cb12796-ski-goggles-icon-by-vexels.png'
            }
            var giftsArr = Array("Snow Globe", "Santa's Hat", "Eggnog", "Cup of Hot Chocolate", 'Ornament', 'Candy Cane', 'Stocking', 'Christmas Tree', 'Candle', 'set of Mittens', 'Festive Wreath', 'Advent Calendar', 'Gift Box', 'Puppy', 'Mistletoe', 'Christmas Star', 'Fireplace', 'Gingerbread', 'Gingerbread House', 'Cookie', 'set of Ice Skates', 'Snowboard', 'set of Skis', 'Snowball', 'Icicle', 'Bicycle', 'Toy Robot', 'Christmas Light', 'Sled', 'Pair of Snow Goggles');
            var randGifts = giftsArr[Math.floor(Math.random() * giftsArr.length)];
            const giftEmbed = new Discord.MessageEmbed()
                .setColor('blue')
                .setTitle("Merry Christmas!")
                .setImage(giftings[randGifts])
                .setDescription(`As a thank you for your kindness ${message.author.username}, they give you one ` + randGifts);
            message.channel.send(giftEmbed);
        }
        return jolly();
    }
    
            }
        
)
