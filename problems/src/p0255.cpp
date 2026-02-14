#include <iostream>
#include <type_traits>

template <class T, std::enable_if_t<std::is_integral_v<T>, int> = 0>
void h(T) {
    std::cout << 'i';
}

template <class T, std::enable_if_t<!std::is_integral_v<T>, int> = 0>
void h(T) {
    std::cout << 'o';
}

int main() {
    h(1);
    h(1.0);
    std::cout << "\n";
}
