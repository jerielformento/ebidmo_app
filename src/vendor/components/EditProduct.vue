<template>
    <div>
    <Transition>
    <div v-if="isMounted" class="bg-gray-100 pb-5">
            <div class="mx-auto sm:py-1">
                <div class="w-full mt-3 shadow-sm tracking-tight text-gray-700 items-center justify-between inline-block bg-white px-5 py-3 border border-t-amber-500 border-t-4 border-gray-200 rounded-sm">
                    <div class="flex items-center justify-between">
                        <span class="mr-1 text-lg inline-block font-bold">Edit Product</span>
                        <XMarkIcon @click="cancel" class="h-7 w-7 text-gray-400 cursor-pointer"/>
                    </div>
                    <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-5">
                        <div class="sm:col-span-3">
                            <label for="name" class="block text-sm font-medium leading-6">Product Name</label>
                            <div class="mt-2">
                                <input v-model="postdata.name" id="name" name="name" type="text" autocomplete="name" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                <small v-if="errordata.name !== ''" class="text-red-400">{{ errordata.name }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-6">
                            <label for="details" class="block text-sm font-medium leading-6">Description</label>
                            <ckeditor :editor="editor" v-model="postdata.details" :config="editorConfig"></ckeditor>
                            <small v-if="errordata.details !== ''" class="text-red-400">{{ errordata.details }}</small>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="category" class="block text-sm font-medium leading-6">Category</label>
                            <div class="mt-2">
                                <select v-model="postdata.category" id="category" name="category" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                    <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.title }}</option>
                                </select>
                                <small v-if="errordata.category !== ''" class="text-red-400">{{ errordata.category }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="brand" class="block text-sm font-medium leading-6">Brand</label>
                            <div class="mt-2">
                                <select v-model="postdata.brand" id="brand" name="brand" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                    <option v-for="brand in brands" :value="brand.id" :selected="brand.is_active" :key="brand.id">{{ brand.description }}</option>
                                </select>
                                <small v-if="errordata.brand !== ''" class="text-red-400">{{ errordata.brand }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="condition" class="block text-sm font-medium leading-6">Condition</label>
                            <div class="mt-2">
                                <select v-model="postdata.condition" id="condition" name="condition" required class="block w-full rounded-sm border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-300 sm:text-sm sm:leading-6">
                                    <option v-for="condition in conditions" :value="condition.id" :selected="condition.is_active" :key="condition.id">{{ condition.description }}</option>
                                </select>
                                <small v-if="errordata.condition !== ''" class="text-red-400">{{ errordata.condition }}</small>
                            </div>
                        </div>
                        <div class="sm:col-span-6">
                            <label for="images" class="block text-sm font-medium leading-6">Upload Image</label>
                            <div class="mt-2">
                                <div class="flex justify-normal items-center">
                                <input name="images" @change="onFileChange" ref="file" multiple class="block w-auto text-sm text-gray-500 font-semibold border border-gray-200 rounded-sm cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file">
                                <button @click="clearUploadedFile" class="flex items-center ml-1 border border-gray-200 rounded-sm disabled:opacity-80 bg-red-500 text-white px-3 py-0.5 text-sm font-semibold leading-6 shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                                    clear
                                </button>
                            </div>
                                <p class="text-sm font-normal text-gray-400">File ext: jpg, png</p>
                            </div>
                        </div>

                        <TransitionGroup>
                            <h2 class="text-md sm:col-span-6 text-amber-500 font-semibold pt-4 border-t border-gray-100" v-if="url !== null">Thumbnail Preview</h2>

                            <div class="relative sm:col-span-1" v-for="(img, index) in postdata.images_active" :key="img.id">
                                <div :class="(modal.id === img.id) ? 'border-2 border-red-500' : 'border border-gray-100'" class="relative shadow-sm rounded-md bg-gray-100 aspect-h-2 aspect-w-2 overflow-hidden group-hover:opacity-90 lg:w-auto lg:h-50">
                                    <img :src="img.url" class="object-cover object-center w-full h-full">
                                </div>
                                <XMarkIcon @click="deleteImage(img.id, index)" class="absolute h-7 w-7 text-red-500 top-1 right-1 cursor-pointer"/>
                            </div>

                            <DeleteImageModal 
                                        v-if="deleteModal" 
                                        :cancel="cancelModal" 
                                        :id="modal.id"
                                        :index="modal.index"
                                        :deleteSubmit="submitDeleteImage"
                                    />

                            <div class="relative sm:col-span-1" v-for="(img, index) in url" :key="img" v-if="url !== ''">
                                <div class="relative shadow-sm border border-gray-100 rounded-md bg-gray-100 aspect-h-2 aspect-w-2 overflow-hidden group-hover:opacity-90 lg:w-auto lg:h-50">
                                    <img :src="img" class="object-cover object-center w-full h-full">
                                </div>
                                <div class="absolute h-auto w-auto px-1 rounded-sm py-0.5 text-xs text-green-200 bg-green-600 top-1 right-1 font-semibold">new</div>
                            </div>
                        </TransitionGroup>
                        
                        <div class="sm:col-span-6 flex justify-end border-t border-gray-300">
                            <button @click="cancel" type="submit" :disabled="isSubmit" class="mt-3 mr-2 flex items-center justify-center border border-gray-200 rounded-sm disabled:opacity-80 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200">
                                Cancel
                            </button>
                            <button @click="submit" type="submit" :disabled="isSubmit" class="mt-3 flex items-center justify-center rounded-sm disabled:opacity-80 bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950">
                                Update
                                <ArrowPathIcon class="animate-spin h-5 w-5 ml-1" v-if="isSubmit"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="mt-3 w-full text-gray-500 bg-white p-3 mb-10 border border-gray-200 rounded-sm">
            <div class="mx-auto sm:py-1 flex items-center justify-center">
                <ArrowPathIcon class="animate-spin h-5 w-5 ml-1"/>
            </div>
        </div>
    </Transition>
    </div>
</template>
<script setup>
    import { ArrowPathIcon } from '@heroicons/vue/24/outline';
    import { XMarkIcon } from '@heroicons/vue/24/solid';
    import { ref, onMounted } from 'vue';
    import axiosClient from '../../axios';
    import { toast } from 'vue3-toastify';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import { useRoute } from 'vue-router';
    import DeleteImageModal from '../util/DeleteImageModal.vue';
</script>
<script>
    export default {
        props: {
            cancel: Function,
            scrollToTop: Function,
            reload: Function,
            categories: Array,
            brands: Array,
            conditions: Array
        },   
        data(props) {
            
            const isSubmit = ref(false);
            const deleteModal = ref(false);
            const isMounted = ref(false);
            const route = useRoute();
            const url = ref(null);
            const categories = ref(null);
            const brands = ref(null);
            const conditions = ref(null);
            categories.value = props.categories;
            conditions.value = props.conditions;
            brands.value = props.brands;
            let postdata = [];

            onMounted(async() => {
                let sel_brand = 0;
                let sel_condition = 0;
                let sel_category = 0;
                

                await axiosClient.get(`/api/v1/product/${route.params.store}/${route.params.slug}`)
                    .then(response => {
                        postdata.name = response.data.name;
                        postdata.details = response.data.details;
                        postdata.category = response.data.category.id;
                        postdata.brand = response.data.brand.id;
                        postdata.condition = response.data.condition.id;
                        postdata.category = response.data.category.id;
                        postdata.images_active = response.data.images;
                        sel_brand = response.data.brand.id;
                        sel_condition = response.data.condition.id;
                        sel_category = response.data.category.id;
                    });

                isMounted.value = true;
            });

            return {
                deleteModal,
                modal: {
                    id: '',
                    index: 0
                },
                url: url,
                origimg: null,
                isMounted,
                isSubmit,
                categories,
                brands,
                conditions,
                postdata,
                errordata: {
                    name: '',
                    details: '',
                    category: '',
                    brand: '',
                    condition: '',
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
                //console.log(files);
                Object.entries(files).forEach(entry => {
                    getf.push(URL.createObjectURL(entry[1]));
                    URL.revokeObjectURL(entry[1]);
                });
                this.url = getf;
            },
            async submit() {
                this.isSubmit = true;
                const formData = new FormData();
                const files = this.$refs.file.files;
                const totalfiles = this.$refs.file.files.length;
                
                for(var i = 0; i < totalfiles; i++) {
                    formData.append('images[]', files[i]);
                }

                if(totalfiles === 0) {
                    formData.append('images', null); 
                }
                formData.append('name', this.postdata.name);
                formData.append('details', this.postdata.details);
                formData.append('category', this.postdata.category);
                formData.append('condition', this.postdata.condition);
                formData.append('brand', this.postdata.brand);
                formData.append('_method', 'PUT');

                const headers = {'Content-Type': 'multipart/form-data'};
                await axiosClient.get(import.meta.env.VITE_CSRF_AUTH_URL);
                await axiosClient.post(`/api/v1/product/${this.$route.params.slug}`, formData, {headers}).
                    then(response => {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });

                        this.cancel();
                        this.scrollToTop();
                        this.reload();

                    })
                    .catch((error) => {
                        this.isSubmit = false;
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
            },
            deleteImage(id, index) {
                this.modal.id = id;
                this.modal.index = index;
                this.deleteModal = true;
            },
            submitDeleteImage(index) {
                this.postdata.images_active.splice(index, 1);
            },
            cancelModal() {
                this.modal.id = '';
                this.modal.index = '';
                this.deleteModal = false;
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
    border:2px solid #F59E0B !important;
}
</style>