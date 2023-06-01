import mongoose, { model } from 'mongoose'

//Geo json looks like this
// "geometry": {
//     "type": "Point",
//     "coordinates": [125.6, 10.1]
//   },

//geolcation schema
const GeoLocation=new mongoose.Schema( {
    type:{
        type: String,
        default: "Point"
        
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    }
})

const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Name field is required"]
        },

        rank: {
            type:String
        },
        availability:{
            type:Boolean,
            default:false
        },
        geometry:GeoLocation
    }
)


//after creating the Schema
//create the model.


const Ninja = mongoose.model("ninja", userSchema);

export default Ninja;
