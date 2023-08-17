import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {ImplicantChart} from '../interfaces/ImplicantChart';
import Color from '../utils/Color';

interface Props {
  title: string;
  data: ImplicantChart[];
  headers: string[];
}

const Chart = ({title, data, headers}: Props): JSX.Element => {
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
          <DataTable.Title
            style={[styles.title, {borderRightColor: '#000'}]}
            textStyle={styles.text}>
            Minterms
          </DataTable.Title>
          {headers.map(item => (
            <DataTable.Title style={styles.title} textStyle={styles.text}>
              {item}
            </DataTable.Title>
          ))}
        </DataTable.Header>

        {data.map((item: ImplicantChart, index: number) => (
          <DataTable.Row key={index} style={styles.row}>
            <DataTable.Cell style={styles.cell}>
              {item.implicant}
            </DataTable.Cell>
            {headers.map(header => (
              <DataTable.Cell style={styles.cell}>
                {item.minterms.includes(header) ? 'X' : ''}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};

export default Chart;

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
  text: {
    color: Color.white,
    fontSize: 14,
    fontWeight: '500',
  },
  row: {
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
  },
  cell: {
    justifyContent: 'center',
    borderRightColor: '#fff',
  },
});
