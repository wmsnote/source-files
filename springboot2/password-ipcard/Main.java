package com.boe.admin.uiadmin.config;

import org.apache.commons.lang3.StringUtils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

public class Main {

    //脱敏省份证
    private static String idCard(String idCard) {
        String num = StringUtils.right(idCard, 4);
        return StringUtils.leftPad(num, StringUtils.length(idCard), "*");
    }

    //脱敏姓名
    public static String chineseName(String chineseName) {
        String name = StringUtils.left(chineseName, 1);
        return StringUtils.rightPad(name, StringUtils.length(chineseName), "*");
    }

    //内部加密方法
    public static byte[] doEncrypt(byte[] plaintext, SecretKey key, byte[] iv, byte[] aad) throws Exception {
        //加密算法
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        //Key规范
        SecretKeySpec keySpec = new SecretKeySpec(key.getEncoded(), "AES");
        //GCM参数规范
        GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(16 * 8, iv);//GCM身份认证Tag长度
        //加密模式
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, gcmParameterSpec);
        //设置aad
        if (aad != null){
            cipher.updateAAD(aad);
        }
        //加密
        byte[] cipherText = cipher.doFinal(plaintext);
        return cipherText;
    }

    //内部解密方法
    public static String doDecrypt(byte[] cipherText, SecretKey key, byte[] iv, byte[] aad) throws Exception {
        //加密算法
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        //Key规范
        SecretKeySpec keySpec = new SecretKeySpec(key.getEncoded(), "AES");
        //GCM参数规范
        GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(16 * 8, iv);
        //解密模式
        cipher.init(Cipher.DECRYPT_MODE, keySpec, gcmParameterSpec);
        //设置aad
        if (aad != null){
            cipher.updateAAD(aad);
        }
        //解密
        byte[] decryptedText = cipher.doFinal(cipherText);
        return new String(decryptedText);
    }




    //加密
    public static void right() throws Exception {

        String name = "吴明升";//客户真实姓名
        String idCard = "140624198806133517";//客户真实身份证号
        String aad = "woms0613";//二次加密的密码 可选

        System.out.println("脱敏后姓名===>" + chineseName(name));//脱敏姓名
        System.out.println("脱敏后身份证号码===>" + idCard(idCard));//脱敏省份证
        System.out.println("二次加密使用秘钥[可选]===>" + aad);
        //密钥生成器
        KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
        //生成密钥
        keyGenerator.init(256);//密钥长度
        SecretKey namekey = keyGenerator.generateKey();
        SecretKey ipCardkey = keyGenerator.generateKey();
        //IV数据
        byte[] nameiv = new byte[12];//初始化向量长度
        byte[] ipCardiv = new byte[12];//初始化向量长度
        //随机生成IV
        SecureRandom random = new SecureRandom();
        random.nextBytes(nameiv);
        random.nextBytes(ipCardiv);

        //处理aad
        byte[] name_aaddata = null;
        byte[] idcard_aaddata = null;
        if (!StringUtils.isEmpty(aad)){
            name_aaddata = aad.getBytes();
            idcard_aaddata = aad.getBytes();
        }


        String nameCipherText = Base64.getEncoder().encodeToString(doEncrypt(name.getBytes(), namekey, nameiv, name_aaddata));
        System.out.println("加密姓名使用的iv===>" + Base64.getEncoder().encodeToString(nameiv));
        System.out.println("加密姓名使用的key===>"+ Base64.getEncoder().encodeToString(namekey.getEncoded()));
        System.out.println("加密后的姓名===>" + nameCipherText);



        String ipCardCipherText = Base64.getEncoder().encodeToString(doEncrypt(idCard.getBytes(), ipCardkey, ipCardiv, idcard_aaddata));
        System.out.println("加密身份证使用的iv===>" + Base64.getEncoder().encodeToString(ipCardiv));
        System.out.println("加密身份证使用的key===>"+ Base64.getEncoder().encodeToString(ipCardkey.getEncoded()));
        System.out.println("加密后的身份证===>" + ipCardCipherText);



    }

    //解密 以name为例, idcard同理
    public static void read() throws Exception {

        String aad = "woms0613";
        String nameKey = "CJdl40pusssstw94ewXWAFg1ksTAGQNu13LQ6jGz4mU=";
        String nameIv = "8LYOtbEK2qwL/ifd";
        String nameCipherText = "59ZkNk53d9dTAc//vyx4Z1lQGNAkGZU6lw==";

        byte[] name_decodedKey = Base64.getDecoder().decode(nameKey);
        //初始化密钥
        SecretKey name_originalKey = new SecretKeySpec(name_decodedKey, 0, name_decodedKey.length, "AES");
        //加载IV
        byte[] name_decodedIv = Base64.getDecoder().decode(nameIv);
        //处理aad
        byte[] aaddata = null;
        if (!StringUtils.isEmpty(aad)){
            aaddata = aad.getBytes();
        }
        String name = doDecrypt(Base64.getDecoder().decode(nameCipherText.getBytes()), name_originalKey, name_decodedIv, aaddata);
        System.out.println(name);



    }




    public static void main(String[] args) throws Exception{
       //right();
       read();
    }








}
