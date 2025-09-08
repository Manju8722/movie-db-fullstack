<template>
    <div>
        <UApp>
            <Sidebar />
            <Header />
            <div class="px-6 py-4 mx-auto">
                <slot></slot>
            </div>
        </UApp>
    </div>
</template>