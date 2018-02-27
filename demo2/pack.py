#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
test
~~~~~~~~~~~~~~~~~~~~
打包工具
"""
import zipfile
import os
name = raw_input("Please input your name:\n")
print "Hello,%s"%name
version = raw_input("Please input version:\n")
print "V%s"%version
main_dir_name = "CloudroomVideoSDK_web(V%s)"%version
f = zipfile.ZipFile("%s.zip"%main_dir_name,"w",zipfile.ZIP_DEFLATED)

meeting_home_dir = "demo\\examples\\Meeting(web)\\home"
videocall_home_dir = "demo\\examples\\VideoCall(web)\\home"
remoterecorddemo_home_dir = "demo\\examples\\RemoteRecordDemo(web)\\home"
recorddemo_home_dir = "demo\\examples\\RecordDemo(web)\\home"

for dirpath,dirnames,filenames in os.walk("demo"):
    if dirpath.find(meeting_home_dir) > -1:
        continue
    if dirpath.find(videocall_home_dir) > -1:
        if dirpath.find("%s\\%s"%(videocall_home_dir,"img")) == -1:
            continue
    if dirpath.find(remoterecorddemo_home_dir) > -1:
        if dirpath.find("%s\\%s"%(remoterecorddemo_home_dir,"media")) == -1:
            continue
    if dirpath.find(recorddemo_home_dir) > -1:
        if dirpath.find("%s\\%s"%(recorddemo_home_dir,"media")) == -1:
            continue
    pack_dirpath = "%s%s"%(main_dir_name,dirpath[4:])
    for filename in filenames:
        file_path = "%s\%s"%(dirpath,filename)
        pack_path = "%s\%s"%(pack_dirpath,filename)
        f.write(file_path,pack_path)
        print 'pack %s to %s'%(file_path,pack_path)
f.close();
name = raw_input("Please input enter end")