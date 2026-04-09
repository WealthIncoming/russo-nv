import { members } from "@wix/members";
import { Member } from ".";

export const getCurrentMember = async (): Promise<Member | null> => {
  try {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('getCurrentMember timed out')), 5000)
    );
    const member = await Promise.race([
      members.getCurrentMember({ fieldsets: ["FULL"] }),
      timeout,
    ]);
    if (!member) {
      console.log('==== No member found');
    }
    return member.member;
  } catch (error) {
    console.log(error);
    return null;
  }
};
