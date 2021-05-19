import React from 'react';

import {
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import {
    IconToggle, 
    Ripple
} from '../utils';

import commonStyles from '../styles';

const AddEditModal = ({ addEditBookModal, submitAddEditBook, onChangeInput, closeAddEditBookModal}) => {

    const inputFieldValidation = addEditBookModal?.data?.title ? "#6d6d6d" : "rgb(255,55,95)";

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={addEditBookModal.visible}
        >
            <View style={styles.modalWrapper}>
                <Pressable style={styles.modalOverlay} onPress={() => closeAddEditBookModal()} />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalView}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.modalHeaderContainer}>
                            <View style={styles.modalHeaderWrapper}>
                                <View style={styles.modalDragContainer}>
                                    <View style={styles.modalDrag}/>
                                </View>
                                <TouchableOpacity onPress={() => closeAddEditBookModal()} style={styles.cancelContainer}>
                                    <Text style={styles.cancelContainerText}>Cancel</Text>
                                </TouchableOpacity>
                                <View style={[commonStyles.center, {paddingVertical:12}]}>
                                    <Text style={styles.modalLabelText}>{addEditBookModal.isAdd ? 'Add' : 'Edit'} Book</Text>
                                </View>
                                <Ripple onPress={() => submitAddEditBook()} style={styles.submitContainer}>
                                    <Text 
                                        style={[styles.modalSubmitBtn, {
                                            color: addEditBookModal.data.title ? '#298df7': '#ccc'
                                        }]}
                                    >
                                        {addEditBookModal.pending ? 'Submitting' : 'Submit'}
                                    </Text>
                                </Ripple>
                            </View>
                            <ScrollView contentContainerStyle={styles.contentContainer}>
                                <View style={styles.inputContainer}>
                                    <View>
                                        <IconToggle
                                            name={"book"}
                                            set={"entypo"}
                                            color={inputFieldValidation}
                                            size={30}
                                        />
                                    </View>
                                    <TextInput
                                        style={styles.inputField}
                                        onChangeText={(value) => onChangeInput(value, 'title')}
                                        value={addEditBookModal.data.title}
                                        placeholder="Book Title"
                                    />
                                </View>
                                <View style={commonStyles.vSpace2} />
                                <View style={commonStyles.row}>
                                    <View>
                                        <IconToggle
                                            name={"account-tie"}
                                            set={"material"}
                                            color={"#6d6d6d"}
                                            size={30}

                                        />
                                    </View>
                                    <TextInput
                                        style={styles.inputField}
                                        onChangeText={(value) => onChangeInput(value, 'author')}
                                        value={addEditBookModal.data.author}
                                        placeholder="Book Author Name"
                                    />
                                </View>
                                <View style={commonStyles.vSpace2} />
                                <View style={commonStyles.row}>
                                    <View>
                                        <IconToggle
                                            name={"category"}
                                            set={"materialicons"}
                                            color={"#6d6d6d"}
                                            size={30}

                                        />
                                    </View>
                                    <TextInput
                                        style={styles.inputField}
                                        onChangeText={(value) => onChangeInput(value, 'category')}
                                        value={addEditBookModal.data.category}
                                        placeholder="Book Category Name"
                                    />
                                </View>
                                <View style={commonStyles.vSpace2} />
                                <View style={commonStyles.row}>
                                    <View>
                                        <IconToggle
                                            name={"pricetags"}
                                            set={"ionicons"}
                                            color={"#6d6d6d"}
                                            size={30}

                                        />
                                    </View>
                                    <TextInput
                                        style={[styles.inputField, {borderBottomWidth:0}]}
                                        onChangeText={(value) => onChangeInput(value, 'price')}
                                        value={addEditBookModal.data.price}
                                        placeholder="Book Price"
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}

export default AddEditModal;

const styles = StyleSheet.create({
    contentContainer: {
        flex:1
    },
    modalWrapper: {
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.2)'
    },
    modalOverlay: {
        flex:0.6
    },
    modalView: {
        flex:0.4,
        overflow:'hidden',
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalHeaderContainer: {
        flex:1
    },
    modalHeaderWrapper: {
        justifyContent:'space-between', 
        flexDirection:'row', 
        backgroundColor:'#f9f9f9', 
        paddingTop:8, 
        paddingBottom:6, 
        borderBottomWidth: 1.5, 
        borderBottomColor: '#e5e5e5'
    },
    modalDragContainer: {
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        position:'absolute', 
        left:0, 
        right:0, 
        top:5, 
        bottom:0
    },
    modalDrag: {
        backgroundColor:'#d3d3d3', 
        height:5, 
        width:38, 
        borderRadius:12
    },
    cancelContainer: {
        marginLeft:12, 
        justifyContent:'center', 
        alignItems:'center'
    },
    cancelContainerText: {
        fontSize:17
    },
    modalLabelText: {
        fontSize: 18, 
        fontWeight: '600'
    },
    submitContainer: {
        alignItems:'center', 
        justifyContent: 'center', 
        marginRight:12
    },
    inputContainer: {
        flexDirection: 'row'
    },
    inputField: {
        flex:1,
        paddingHorizontal: 12,
        borderColor:'#ccc',
        fontSize: 17,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    modalSubmitBtn: {
        fontSize:17, 
        fontWeight:'600'
    }
});


