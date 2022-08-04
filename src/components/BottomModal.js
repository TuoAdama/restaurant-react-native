import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

const BottomModal = ({ bottomSheetModalRef, children }) => {
    const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
            />
        ),
        []
    );


    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
        >
            {children}
        </BottomSheetModal>
    )
}

export default BottomModal

const styles = StyleSheet.create({})