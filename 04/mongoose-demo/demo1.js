const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Cat = mongoose.model('Cat', { name: String });

for(var i=0;i < 30;i++){
    // 实例化一个Cat
    const kitty = new Cat({ name: '喵'+i });

    // 持久化保存kitty 实例
    kitty.save().then(() => console.log('meow'));
}