import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
const DestinationFolder = './src/environments/';

const build_school = process.env['production'] ? process.env['build_school'] : 'development';
const env_build = process.env['production'] && build_school === 'uane'
? build_school
: process.env['production']
? 'production'
: 'development';
const targetPath = !process.env['production'] ? 'environment.prod.ts' : 'environment.ts' ;

const envConfigFile = `export const environment = {
  production: ${process.env['production']},
  endpoints: {
    token: '${process.env[`${env_build}_token`]}',
    datos_personales: '${process.env[`${env_build}_datos_personales`]}',
    datos_academicos: '${process.env[`${env_build}_datos_academicos`]}',
    datos_complementarios: '${process.env[`${env_build}_datos_complementarios`]}',
    tokenCAPI: '${process.env[`${env_build}_tokenCAPI`]}',
    saveCAPI: '${process.env[`${env_build}_saveCAPI`]}',
    educative_offert: '${process.env[`${env_build}_educative_offert`]}'
  },
  credentials: {
    access_token: {
      client_id: '${build_school}_client_id',
      client_secret: '${build_school}_client_secret',
      username: '${build_school}_username',
      password: '${build_school}_password',
      grant_type: '${build_school}_grant_type',
    },
    CAPI: {
      username: '${process.env['capi_username']}',
      password: '${process.env['password']}'
    }
  },
}`;

try {
  fs.mkdirSync(DestinationFolder, { recursive: true } );
} catch (e) {
  console.log('Cannot create folder ', e);
}
fs.writeFile(path.join(DestinationFolder, targetPath), envConfigFile, (err) => {
  if (err) throw err;
});
