import React from 'react';
import colors from "../../config/colors";
import {Text} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// IMPORTANT: if you're using this component inside a scrollview, make sure to add keyboardShouldPersistTaps='always'
// to the scrollview props because otherwise, the on press event will not work
export default props => {
  const borderWidth = 1;
  const borderColor = colors.stainedWhite;

  return (
    <>
      <GooglePlacesAutocomplete
        placeholder={props.placeholder}
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed='false'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={props.onAddressSelected}
        getDefaultValue={props.getDefaultValue}
        query={{
          key: 'AIzaSyDH8Jebb9D-8ep3iRCEav27DwYYVUKEpuY',
          language: 'en', // language of the results
        }}
        styles={{
          container: {
            flex: 0,
            width: '100%',
            backgroundColor: 'white',
          },
          textInputContainer: {
            backgroundColor: 'white',
            borderLeftWidth: borderWidth,
            borderTopWidth: borderWidth,
            borderBottomWidth: borderWidth,
            borderRightWidth: borderWidth,
            borderColor: borderColor,
            borderTopColor: borderColor,
            borderBottomColor: borderColor,
            borderRadius: 5,
          },
          listView: {
            borderColor,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            zIndex: 1000,
          },
          separator: {
            height: 0,
          },
          row: {
            borderBottomColor: borderColor,
            borderBottomWidth: 1,
          },
        }}
        debounce={300} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        enablePoweredByContainer={false}
        textInputProps={{
          onChangeText: props.onChangeText,
        }}
      />
      {props.error && (<Text style={{color: 'red', marginTop: 10}}>{props.error || ''}</Text>)}
    </>
  );
};
