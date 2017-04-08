package com.soen487.project.backend;

/**
 * Created by jeremybrown on 2017-04-05.
 */
public class EnvHelper {

    /**
     * #
     * @param sysPropName name of the system property to get.
     * @param fallback value to return if the system property is null or empty.
     * @return #
     */
    public static String getSystemPropOrFallback(String sysPropName, String fallback) {
        String attempt = System.getProperty(sysPropName);
        if (attempt == null || attempt.isEmpty()) {
            return fallback;
        } else {
            return attempt;
        }
    }
}
