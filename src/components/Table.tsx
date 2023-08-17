import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import Color from '../utils/Color';
import {Data} from '../interfaces/Data';
import {ImplicantChart} from '../interfaces/ImplicantChart';

interface Props {
  title: string;
  data: ImplicantChart[];
  unmarkedImplicants?: string[];
}

const Table = ({title, data, unmarkedImplicants}: Props) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {paddingVertical: 8, borderTopStartRadius: 8, borderTopEndRadius: 8},
        ]}>
        <Text style={[styles.text, {fontSize: 18, fontWeight: 'bold'}]}>
          {title}
        </Text>
      </View>
      <DataTable style={styles.tableContainer}>
        <DataTable.Header style={styles.header}>
          <DataTable.Title style={styles.title} textStyle={styles.text}>
            Impicant
          </DataTable.Title>
          <DataTable.Title style={styles.title} textStyle={styles.text}>
            Decimal
          </DataTable.Title>
        </DataTable.Header>

        {data.map((item: ImplicantChart, index: number) => (
          <DataTable.Row key={index} style={styles.row}>
            <DataTable.Cell style={styles.cell}>
              {`${item.implicant} ${
                unmarkedImplicants?.includes(item.implicant) ? '*' : ''
              }`}
            </DataTable.Cell>
            <DataTable.Cell style={styles.cell}>{item.minterms}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    borderRadius: 8,
  },
  tableContainer: {
    backgroundColor: Color.lightgreen,
    borderRadius: 8,
  },
  header: {
    backgroundColor: Color.darkgreen,
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
  },
  row: {
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
  },
  cell: {
    justifyContent: 'center',
  },
  text: {
    color: Color.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
