import { Module } from '@nestjs/common';
import { ClientProxyFidelity } from './client-proxy';

@Module({
  providers: [ClientProxyFidelity],
  exports: [ClientProxyFidelity],
})
export class ProxyRMQModule {}
