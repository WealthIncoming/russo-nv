import { Member } from ".";

export const getCurrentMember = async (): Promise<Member | null> => {
  try {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('getCurrentMember timed out')), 5000)
    );
    const { members } = await Promise.race([
      import("@wix/members"),
      timeout,
    ]);
    const result = await Promise.race([
      members.getCurrentMember({ fieldsets: ["FULL"] }),
      timeout,
    ]);
    if (!result) {
      console.log('==== No member found');
    }
    return result.member;
  } catch (error) {
    console.log(error);
    return null;
  }
};
