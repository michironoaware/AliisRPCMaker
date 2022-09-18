//TODO: import things for presence management
import { contextBridge } from 'electron';
import { RPC } from './RPC';
import fs from 'fs';
import path from 'path';

contextBridge.exposeInMainWorld('rpc', new RPC());