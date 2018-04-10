import React, { Component } from 'react';
import { View, Image , ImageBackground , Text, findNodeHandle, StyleSheet } from 'react-native';
import { BlurView } from 'react-native-blur';
// sua file blurimage.android. js
/* 

var iface = {
    name: 'BlurImageView',
    propTypes: {
        ...View.propTypes,
        //blurRadius: PropTypes.number,
        //sampling: PropTypes.number,
        // source: PropTypes.object,
    },
    defaultProps: {
        blurRadius: 40,
        sampling: 50,
    },
}


*/
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { viewRef: null , indexImage: -10 };
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    render() {
    
        return (
            <View style={styles.container} ref={(container) => { this.containerRef = container}}>
                <Image
                    ref={(img) => { this.backgroundImage = img; }}
                    source={{ uri: 'https://dummyimage.com/300/09f/fff.png' }}
                    style={[styles.absoluteImage , { zIndex : this.state.indexImage } ]}
                    onLoadEnd={this.imageLoaded.bind(this)}
                />
           
                {(this.state.viewRef == null ? null :
                    <BlurView
                        viewRef={this.state.viewRef}
                        style={styles.absolute}
                        blurType="dark"
                        blurAmount={100}
                    />)}
                <Text onPress={() => { this.setState({ viewRef: null, indexImage: 10  })}}>Turn Off Blur</Text>
                <Text onPress={() => { this.setState({ viewRef: findNodeHandle(this.backgroundImage), indexImage : -10 }) }}>Turn On Blur</Text>
                <Text style={{ zIndex: 299 }} onPress={() => { this.setState({ viewRef: null, indexImage: -10 }) }}>Turn Off Blur With ZIndex Image</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    absoluteImage: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    }
});