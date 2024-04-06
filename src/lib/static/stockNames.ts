import { InterestsEnum } from "@/types";

export function stockNames(interestType: InterestsEnum) {
    switch (interestType) {
        case InterestsEnum.TECH:
            return ["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN", "CRM", "ADBE", "CSCO"];
        case InterestsEnum.HEALTH:
            return ["JNJ", "UNH", "PFE", "ABT", "MDT", "TMO", "PG", "LLY"];
        case InterestsEnum.SUSTAINABILITY:
            return ["NEE", "BEP", "AWK", "PLD", "EQIX", "DLR", "WM", "FSLR"];
        case InterestsEnum.TRAVEL:
            return ["BKNG", "EXPE", "MAR", "HLT", "DAL", "LUV", "CCL", "RCL"];
        case InterestsEnum.FASHION:
            return ["NKE", "TJX", "LULU", "VFC", "TPR", "RL", "PVH", "HBI"];
    }
}