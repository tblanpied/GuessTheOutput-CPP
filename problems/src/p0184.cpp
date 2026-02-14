#include <iostream>

void g(int) {
    std::cout << "A";
}

template <class T>
void g(T) {
    std::cout << "B";
}

int main() {
    short v = 0;
    g(v);
    g(0);
    std::cout << "\n";
}
