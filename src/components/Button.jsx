import React from 'react';
import { Button, Flex } from 'antd';
import Link from 'next/link';

const Buttom = () => (
  <Flex gap="small" wrap>
    <Button href="/reservas" type="primary"color="default" variant="solid">Ir Para API</Button>
  </Flex>
);
export default Buttom;

