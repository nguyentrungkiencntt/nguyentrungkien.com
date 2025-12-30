import { Reward } from "@/utils/define";

export function getRandomReward(rewards:Reward[]) {
  // Tính tổng trọng số


  const totalWeight = rewards?.reduce((sum, r) => sum + (r?.weight ? r?.weight : 0), 0);
  
  // Sinh số ngẫu nhiên từ 0 → totalWeight
  let random = Math.random() * totalWeight;
  
  // Tìm phần thưởng tương ứng
  for (const reward of rewards) {
    if (random < (reward?.weight ? reward?.weight : 0)) {
      return reward?.label;
    }
    random -= (reward?.weight ? reward?.weight : 100);
  }
}

export const getWeightedRandomReward = (rewards: Reward[]) => {
        const totalWeight = rewards.reduce((sum, r) => sum + (r?.weight ? r?.weight : 0), 0);
        let random = Math.random() * totalWeight;

        for (let i = 0; i < rewards.length; i++) {
            const r = rewards[i];
            if (random < (r?.weight ? r?.weight : 0)) {
                return i;
            }
            random -= (r?.weight ? r?.weight : 100);
        }
        return rewards.length - 1;
    };