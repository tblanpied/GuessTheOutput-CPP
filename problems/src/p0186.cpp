#include <iostream>
#include <type_traits>

template <class T>
int h(T t) {
    if constexpr (std::is_pointer_v<T>) {
        return *t;
    } else {
        return t + 1;
    }
}

int main() {
    int x = 4;
    int* p = &x;
    std::cout << h(p) << h(2) << "\n";
}
