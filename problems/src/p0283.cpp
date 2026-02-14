#include <iostream>
#include <cstddef>

template <class T, std::size_t N>
std::size_t n(T (&)[N]) {
    return N;
}

int main() {
    int a[5]{};
    std::cout << n(a) << "\n";
}
