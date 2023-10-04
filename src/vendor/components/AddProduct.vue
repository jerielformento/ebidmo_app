<template>
    <div>
    <Transition>
    <div v-if="isMounted" class="bg-gray-100 pb-5">
            <div class="mx-auto sm:py-1">
                <div class="w-full mt-3 shadow-sm tracking-tight text-gray-700 items-center justify-between inline-block bg-white px-5 py-3 border border-t-amber-500 border-t-4 border-gray-200 rounded-md">
                    <div class="flex items-center justify-between">
                        <span class="mr-1 text-lg inline-block font-bold">Add New Product</span>
                        <XMarkIcon @click="cancel" class="h-7 w-7 text-gray-400 cursor-pointer"/>
                    </div>
                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-5">
                        <div class="sm:col-span-3">
                            <InputText v-model="postdata.name" label="Product Name" name="name" type="text" :error="errordata.name"/>
                        </div>
                        <div class="sm:col-span-6">
                            <label for="details" class="block text-sm font-medium leading-6">Description</label>
                            <ckeditor v-model="postdata.details" :editor="editor" :config="editorConfig"></ckeditor>
                            <small v-if="errordata.details !== ''" class="text-red-400">{{ errordata.details }}</small>
                        </div>
                        <div class="sm:col-span-2">
                            <InputSelect v-model="postdata.category" label="Category" name="category" :error="errordata.category" :list="categories"/>
                        </div>
                        <div class="sm:col-span-2">
                            <InputSelect v-model="postdata.brand" label="Brand" name="brand" :error="errordata.brand" :list="brands"/>
                        </div>
                        <div class="sm:col-span-2">
                            <InputSelect v-model="postdata.condition" label="Condition" name="condition" :error="errordata.condition" :list="conditions"/>
                        </div>
                        <div class="sm:col-span-2">
                            <InputSelect v-model="postdata.location" label="Location" name="location" :error="errordata.location" :list="locations"/>
                        </div>
                        <div class="sm:col-span-6">
                            <label for="images" class="block text-sm font-medium leading-6">Upload Image</label>
                            <div class="mt-2">
                                <div class="flex justify-normal items-center">
                                <input name="images" @change="onFileChange" ref="file" multiple accept="image/png, image/jpeg" class="block w-auto text-xs text-gray-500 font-semibold border border-gray-200 rounded-md cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file">
                                <button @click="clearUploadedFile" class="flex items-center ml-1 border border-gray-200 rounded-md disabled:opacity-80 bg-gray-100 text-gray-700 p-2 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                                    <XMarkIcon class="text-red-500 h-5 w-5" />
                                </button>
                            </div>
                                <p class="text-sm font-normal text-gray-400">File ext: jpg, png</p>
                            </div>
                        </div>

                        <TransitionGroup>
                            <h2 class="text-md sm:col-span-6 text-amber-500 font-semibold pt-4 border-t border-gray-100" v-if="url !== null">Thumbnail Preview</h2>
                            <div class="relative sm:col-span-1" v-for="(img, index) in url" :key="img" v-if="url !== ''">
                                <div class="relative shadow-sm border border-gray-100 rounded-md bg-gray-100 aspect-h-2 aspect-w-2 overflow-hidden group-hover:opacity-90 lg:w-auto lg:h-50">
                                    <img :src="img" class="object-cover object-center w-full h-full">
                                </div>
                            </div>
                        </TransitionGroup>
                        
                        <div class="sm:col-span-6 flex justify-end border-t border-gray-300">
                            <button @click="cancel" type="submit" :disabled="isSubmit" class="mt-3 mr-2 flex items-center justify-center border border-gray-200 rounded-md disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                                Cancel
                            </button>
                            <ButtonForm @onClick="submit" text="Save Product" :state="isSubmit" class="mt-3 px-3 py-1.5"/> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="mt-3 w-full text-gray-500 bg-white p-3 mb-10 border border-gray-200 rounded-md">
            <div class="mx-auto sm:py-1 flex items-center justify-center">
                <Spinner class="h-6 w-6"/>
            </div>
        </div>        
    </Transition>
    </div>
</template>
<script>
    import Spinner from '../../components/forms/Spinner.vue';
    import { XMarkIcon } from '@heroicons/vue/24/solid';
    import { ref, onMounted } from 'vue';
    import axiosClient from '../../axios';
    import { toast } from 'vue3-toastify';
    import { initFlowbite } from 'flowbite';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import InputText from '../../components/forms/InputText.vue';
    import InputSelect from '../../components/forms/InputSelect.vue';
    import ButtonForm from '../../components/forms/Button.vue';

    const isSubmit = ref(false);

    export default {
        props: {
            cancel: Function,
            scrollToTop: Function,
            reload: Function,
            categories: Array,
            conditions: Array,
            brands: Array,
            locations: Array
        },
        components: { Spinner, InputText, InputSelect, ButtonForm, XMarkIcon },
        setup() {
            const isMounted = ref(false);
            const url = ref(null);

            onMounted(async() => {
                initFlowbite();
                isMounted.value = true;
            });

            return {
                url: url,
                origimg: null,
                isSubmit,
                isMounted
            }
        },
        data() { 
            return {
                postdata: {
                    name: '',
                    details: '',
                    brand: null,
                    condition: null,
                    category: null,
                    location: null,
                    images: []
                },
                errordata: {
                    name: '',
                    details: '',
                    brand: '',
                    condition: '',
                    category: '',
                    location: '',
                    images: ''
                },
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed']
                }
            }
        },
        methods: {
            onFileChange() {
                this.url = null;
                const files = this.$refs.file.files;
                //console.log(this.$refs.file);
                this.postdata.images = this.$refs.file.files;
                
                let getf = [];
                let error_file = 0;
                //console.log(files);
                Object.entries(files).forEach(entry => {
                    if(entry[1].type === 'image/jpeg' || entry[1].type === 'image/png') {
                        getf.push(URL.createObjectURL(entry[1]));
                        URL.revokeObjectURL(entry[1]);
                    } else {
                        error_file += 1;
                    }
                });

                if(error_file > 0) {
                    this.clearUploadedFile();
                    toast.error("Invalid file extension", {
                        position: toast.POSITION.BOTTOM_CENTER,
                    });
                } else {
                    this.url = getf;
                }
            },
            async submit() {
                isSubmit.value = true;
                //console.log(this.postdata);
                const formData = new FormData();
                const files = this.$refs.file.files;
                const totalfiles = this.$refs.file.files.length;
                for(var i = 0; i < totalfiles; i++) {
                    formData.append('images[]', files[i]);
                }
                //formData.append('images', this.$refs.file.files[0]);
                formData.append('name', this.postdata.name);
                formData.append('details', this.postdata.details);
                formData.append('category', this.postdata.category);
                formData.append('condition', this.postdata.condition);
                formData.append('brand', this.postdata.brand);
                formData.append('location', this.postdata.location);
             
                const headers = { 'Content-Type': 'multipart/form-data' };
                await axiosClient.get(import.meta.env.VITE_CSRF_AUTH_URL);
                await axiosClient.post('/api/v1/products', formData, {headers}).
                    then(response => {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });

                        isSubmit.value = false;
                        this.cancel();
                        this.scrollToTop();
                        this.reload();
                    })
                    .catch((error) => {
                        isSubmit.value = false;
                        const err = error.response;

                        toast.error(err.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });

                        // reset error data
                        Object.entries(this.errordata).forEach(entry => {
                            const [key, value] = entry;
                            this.errordata[key] = '';
                        });

                        // get return object errors and pass to error inputs
                        Object.entries(err.data.errors).forEach(entry => {
                            const [key, value] = entry;
                            this.errordata[key] = value[0];
                        });

                        console.log(this.errordata);
                    });
            },
            clearUploadedFile() {
                this.$refs.file.value = '';
                this.postdata.images = '';
                this.url = null;
            }
        }
    }
</script>
<style>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
.ck-powered-by {
    display:none;
}
.ck-content:hover, .ck-content:focus {
    border:2px solid #FBBF24 !important;
}
</style>