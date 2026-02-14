#include <iostream>
#include <utility>

void f(int&)  { std::cout << 'L'; }
void f(int&&) { std::cout << 'R'; }

template <class T>
void g(T&& t) {
    f(std::forward<T>(t));
}

int main() {
    int x = 0;
    g(x);
    g(0);
    std::cout << "\n";
}
