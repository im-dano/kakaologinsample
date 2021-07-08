import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import KakaoSDK from '@actbase/react-kakaosdk';

class KakaoLoginBtn extends React.Component {
  constructor() {
    super();
    this.state = {
      tmTxt: '살려줘'
    }
  }

  onPress = () => {
    this.kakaoLogin();
  }

  kakaoLogin = async () => {
    //Alert.alert("kakaoLogin");
    KakaoSDK.login()
        .then((result) => {
          this.getProfile();
          Alert.alert(`Login Finished:${JSON.stringify(result)}`);
        })
        .catch((err) => {
          if (err.code === 'E_CANCELLED_OPERATION') {
            Alert.alert(`Login Cancelled:${err.message}`);
          } else {
            Alert.alert(`Login Failed:${err.code} ${err.message}`);
          }
        });

  }

  getProfile = () => {
    KakaoSDK.getProfile()
        .then((result) => {
          Alert.alert(`Login Finished:${JSON.stringify(result)}`);
          // 이후 result.id를 활용해서 로그인 로직을 구현해주세용
          this.setState({
            tmTxt: result
          })
        })
        .catch((err) => {
          console.log(`Get Profile Failed:${err.code} ${err.message}`);
        });
  };

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={this.onPress}>
            <Text>카카오 로그인</Text>
          </TouchableOpacity>
          <Text>{this.state.tmTxt}</Text>
        </View>
    );
  };
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FEE500',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});

export default KakaoLoginBtn;
