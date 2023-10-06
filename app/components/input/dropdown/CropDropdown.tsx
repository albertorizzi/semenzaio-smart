import { onValue, ref } from 'firebase/database';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import DropdownSelect from 'react-native-input-select';
import { db } from '../../../lib/firebase.config';
import { ICrop } from '../../../shared/types';
import tw from '../../../tailwind';
import SensorCard from '../../card/SensorCard';

interface Props {
    setCrop: React.Dispatch<React.SetStateAction<ICrop | null | undefined>>
    crop: ICrop | null | undefined
}

const CropDropdown: React.FC<Props> = ({ setCrop, crop }) => {


    const [crops, setCrops] = React.useState<ICrop[] | null>([]);
    const [currentCrop, setCurrentCrop] = React.useState<string>("");

    useEffect(() => {  
        const allCrops = ref(db, "configuration");
        onValue(allCrops, (snapshot) => {
            const data = snapshot.val();
            setCurrentCrop(data.currentCrop);
            const cropsArray: ICrop[] = Object.keys(data.crops).map(crop => ({ name: crop, setting: data.crops[crop] }));
            setCrops(cropsArray);
            setCrop(cropsArray.find(crop => crop.name === data.currentCrop) || null);
          });
    },[]);

    return (
     
        <View style={tw.style('')}>
            <DropdownSelect
                dropdownStyle={tw.style('mt-4')}
                placeholder="Seleziona coltura ..."
                options={ crops ? crops.map(crop => ({ name: crop.name })):[]}
                optionLabel={'name'}
                optionValue={'name'}
                selectedValue={currentCrop}
                onValueChange={(value:string) => {
                    setCurrentCrop(value);
                    setCrop(crops ? crops.find(crop => crop.name === value) || null : null);
                }}
                isSearchable
                primaryColor={'deepskyblue'}
            />
                
            </View>
           
 
    );
};

export default CropDropdown;
