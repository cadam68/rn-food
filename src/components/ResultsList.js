import React from 'react';
import { View, Text, StyleSheet, Linking, Platform, TouchableOpacity, FlatList} from 'react-native';
import { STYLES, GUI } from '../hooks/useTools';
import ResultsDetail from './ResultsDetail'

const ResultsList = ({title, values}) => {

    //!\
    if(!values.length) return null;

    /*
    const renderResult = (item) => {
        return (
                <ResultsDetail item={item}/>
        );      
    }
    */

    return(
        <View style={{flex:1}}> 
            <GUI.TitleH1 text={title} styleView={{marginLeft:15}}/>
            <FlatList style={{marginTop:5}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={values}
                keyExtractor={(item, index) => item.id}
                // renderItem={({item}) => { return renderResult(item); }}
                renderItem={({item}) => { return(<ResultsDetail item={item}/>); }}
            />
        </View>
    );
}

export default ResultsList;