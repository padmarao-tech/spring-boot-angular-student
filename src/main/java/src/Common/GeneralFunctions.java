package src.Common;

import java.security.SecureRandom;

public class GeneralFunctions {

    public String generateSecretKey(int length) {
        String ALLOWED_CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (ALLOWED_CHARACTERS.length() < length) {
            throw new IllegalArgumentException("Strength should not be greater than " + ALLOWED_CHARACTERS.length());
        }

        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(ALLOWED_CHARACTERS.length());
            sb.append(ALLOWED_CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }
}
