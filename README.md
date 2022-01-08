<!-- <p align="center">
  <a href="https://github.com/actions/checkout"><img alt="GitHub Actions status" src="https://github.com/actions/checkout/workflows/test-local/badge.svg"></a>
</p> -->

# Aliyun-deploy

这个是自己用的把前端项目部署的阿里云服务器的一个`action`集合。  

# Process  
- 切换分支到`main`  
- 安装依赖  
- 打包  
- 合并文件夹(可选)  
- 服务器备份上一版本文件内容  
- 上传当前版本文件内容  
- 进入服务器项目目录进行特殊操作  

# Attention  

这是自己使用的部署`action`，如果需要使用的话请`clone`此项目，并在项目中添加`secrets`:  
- SSH_USERNAME  
- SSH_PASSWORD  
- SSH_HOST  
# Usage

<!-- start usage -->
```yaml
- uses: actions/aliyun-deploy-@v1
  with:
    # 服务器上的路径
    remote_path: '/home/to/project'

    # 服务器用于保存上一版本的路径
    remote_path_prev: '/home/to/project-prev'

    # 项目的打包文件夹名称
    # default: dist 
    dist_path_name: ''

    # 打包命令
    # default: build 
    build_exec-key: ''

    # 是否需要上传多个文件 | 文件夹
    # 配合merge_file_dir使用
    # default: false 
    need_merge: 'false'

    # 需要上传的文件 | 文件夹地址  
    # 配合 need_merge 使用  
    merge_file_dir: './dist,./package.json'

    # 服务器项目目录安装命令
    remote_action_install: yarn -production

    # 服务器项目目录启动命令
    remote_action_start: yarn start:production

```
<!-- end usage -->


## 设置打包文件夹名称

```yaml
- uses: actions/aliyun-deploy-@v1
  with:
    dist_path_name: 'build'
```

## 设置项目特殊的打包命令

```yaml
- uses: actions/aliyun-deploy-@v1
  with:
    build_exec: 'build:production'
```

## 合并文件夹

```yaml
- uses: actions/aliyun-deploy-@v1
  with:
    dist_path_name: 'build'
    need_merge: 'true'
    merge_file_dir: './dist,./.nuxt,./package.json,.nuxt.config.js'
```


