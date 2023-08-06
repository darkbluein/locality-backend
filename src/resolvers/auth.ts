import Auth from "../models/Auth/model";
import twclient from "../utils/twilio";
import config from "../config";
import { ITwilioMessageSchema } from "../interfaces/auth.interface";
import { AuthVerifyTypes } from "../constants/auth.enum";

const resolvers = {
  Mutation: {
    async generateCode({}, contact, {}) {
      // fetch if document exists
      const req = { ...contact };
      const session = await Auth.findOne({
        contact: req,
        status: AuthVerifyTypes.UNVERIFIED,
      }).exec();

      if (session) {
        return session.id;
      }

      const code =
        process.env.NODE_ENV === "production"
          ? Math.floor(100000 + Math.random() * 900000)
          : 111111;

      try {
        const sid = config.twilio.sid;
        let messagingSid = "mock-sid";
        if (process.env.NODE_ENV === "production") {
          twclient.messages
            .create({
              body: `Locality verification code: ${code}`,
              sid,
              to: `${contact.ISD}${contact.number}`,
            })
            .then((message: ITwilioMessageSchema) => {
              messagingSid = message.sid;
            })
            .done();
        }

        const newSession = await new Auth({
          code,
          messagingSid,
          contact: req,
        }).save();

        return newSession.id;
      } catch (err) {
        throw new Error(err);
      }
    },
    async verifyCode({}, verifyCodeDto, {}) {
      const { code, id } = verifyCodeDto;
      const session = await Auth.findById(id).exec();

      if (!session) {
        throw new Error("Session not found.");
      }

      if (session.code !== code) {
        throw new Error("Verification code does not match. Try again");
      } else {
        await Auth.updateOne(
          {
            _id: id,
          },
          {
            status: AuthVerifyTypes.VERIFIED,
          }
        )
          .exec()
          .catch((err) => {
            throw new Error(err);
          })
          .finally(() => {
            return true;
          });
      }
    },
  },
  Query: {
    status() {
      return true;
    },
  },
};

export default resolvers;
