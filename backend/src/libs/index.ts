import { OrmModule } from './orm.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';

export default [OrmModule, MailModule, AuthModule];
