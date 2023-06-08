package com.nw.service;

import com.nw.NetworkingAppApplication;
import com.nw.exception.FileStorageException;
import com.nw.exception.MyFileNotFoundException;
import com.nw.property.FileStorageProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.SecureRandom;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class FileStorageService {

    private static final Pattern pattern = Pattern.compile("\\.[a-zA-Z0-9]+");

    private final Path fileStorageLocation;
    private static final Logger logger = LoggerFactory.getLogger(FileStorageService.class);

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            logger.error("Could not create the directory where the uploaded files will be stored.", ex);
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public static String getFileExtension(String name) {
        String extension;
        try {
            extension = name.substring(name.lastIndexOf("."));

        } catch (Exception e) {
            extension = "";
        }
        return extension;
    }

    public static String getFileExtensionRegex(String name) {

        String extension = null;
        Matcher m1 = null;

        if (name != null) {
            m1 = pattern.matcher(name);
        }

        if (m1 != null) {
            while (m1.find()) {
                extension = m1.group();
            }
        }
        return extension;
    }

    public static String generateString() {
        return UUID.randomUUID().toString().replace("-", "");
    }

    public static Long generateRandomReference(int len) {
        String chars = "0123456789";
        SecureRandom rnd = new SecureRandom();
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return (long) Integer.parseInt(sb.toString());
    }

    public static Long concat(Long a, Long b) {
        String s1 = Long.toString(a);
        String s2 = Long.toString(b);
        String s = s1 + s2;
        long c = Long.parseLong(s);
        return c;
    }

    public String storeFile(MultipartFile file) {

        String originalName = file.getOriginalFilename();
        String extension = getFileExtension(originalName);
        String fileNames = file.getName();

        File convertedFile = new File(generateString() + extension);

        String fileName = StringUtils.cleanPath(String.valueOf(convertedFile));

        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }

    public void delete(String filename) {
        try {
            FileSystemUtils.deleteRecursively(fileStorageLocation.resolve(filename));
        } catch (IOException e) {
            logger.error("error deleting");
        }
    }

}
